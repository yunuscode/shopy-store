import {
  Card,
  Flex,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import {
  IconArrowsDownUp,
  IconCircleX,
  IconSearch,
  IconX,
} from '@tabler/icons-react';
import { FilterParams } from 'pages/home/home.types';

type AllFiltersProps = {
  filters: FilterParams;
  setFilters: React.Dispatch<React.SetStateAction<FilterParams>>;
  count?: number;
};

type RangeFiltersProps = {
  filters: FilterParams;
  setFilters: React.Dispatch<React.SetStateAction<FilterParams>>;
};

export const RangeFilters = (props: RangeFiltersProps) => {
  const { filters, setFilters } = props;

  const setValue = (type: 'from' | 'to', value: number) => {
    if (type === 'from') setFilters({ ...filters, from: Number.isNaN(value) ? 0 : value });
    if (type === 'to') setFilters({ ...filters, to: Number.isNaN(value) ? 0 : value });
  };

  const removeRange = () => {
    setFilters({ ...filters, to: 0, from: 0 });
  };

  return (
    <Card>
      <Flex justify="space-between" align="center">
        <Title size="md">Filters</Title>
        <UnstyledButton onClick={removeRange}>
          <Flex align="center" gap={5}>
            <Text size="sm" color="gray">
              Reset all
            </Text>
            <IconX color="gray" size={16} />
          </Flex>
        </UnstyledButton>
      </Flex>
      <Space h="xl" />
      <Stack>
        <Text size="md" weight="bolder">
          Price
        </Text>
        <Flex gap={5}>
          <Flex
            align="center"
            p={2}
            px={10}
            style={{
              borderWidth: 1,
              borderColor: '#DEE2E6',
              borderStyle: 'solid',
              borderRadius: 4,
            }}
          >
            <Text color="gray" size="sm">
              From:
            </Text>
            <TextInput
              size="xs"
              type="number"
              variant="unstyled"
              onChange={(e) => setValue('from', e.target.valueAsNumber)}
              value={filters.from || ''}
            />
          </Flex>
          <Flex
            align="center"
            p={2}
            px={10}
            style={{
              borderWidth: 1,
              borderColor: '#DEE2E6',
              borderStyle: 'solid',
              borderRadius: 4,
            }}
          >
            <Text color="gray" size="sm">
              To:
            </Text>
            <TextInput
              type="number"
              size="xs"
              variant="unstyled"
              onChange={(e) => setValue('to', e.target.valueAsNumber)}
              value={filters.to || ''}
            />
          </Flex>
        </Flex>
      </Stack>
    </Card>
  );
};

export const AllFilters = (props: AllFiltersProps) => {
  const { filters, setFilters, count } = props;

  const onSearchChange = (text: string) => setFilters({ ...filters, searchText: text });

  const onSortChange = (text: string | null) => {
    if (text === 'desc' || text === 'asc') setFilters({ ...filters, sort: { createdOn: text } });
  };

  const removeRange = () => {
    setFilters({ ...filters, to: 0, from: 0 });
  };

  const filterText = () => {
    if (filters.from && filters.to) {
      return `${filters.from}-${filters.to}`;
    }

    if (filters.from) return `From: ${filters.from}`;

    if (filters.to) return `To: ${filters.to}`;
  };

  return (
    <>
      <TextInput
        icon={<IconSearch size={20} />}
        placeholder="Type to search..."
        styles={{ input: { fontSize: 14 } }}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Flex align="center" justify="space-between">
        <Text weight="bolder">
          {count || 0}
          {' '}
          results
        </Text>
        <Select
          onChange={(s) => onSortChange(s)}
          icon={<IconArrowsDownUp size={14} />}
          size="sm"
          data={[
            {
              value: 'desc',
              label: 'Sort by newest',
            },
            {
              value: 'asc',
              label: 'Sort by oldest',
            },
          ]}
          variant="unstyled"
          defaultValue={filters.sort.createdOn}
        />
      </Flex>
      <Flex>
        {(!!filters.from || !!filters.to) && (
          <UnstyledButton
            p={5}
            px={20}
            onClick={removeRange}
            style={{
              background: 'white',
              borderRadius: 50,
              border: '1px solid #DEE2E6',
            }}
          >
            <Flex align="center">
              <Text size="sm" mr={5}>
                {filterText()}
              </Text>
              <IconCircleX size={18} />
            </Flex>
          </UnstyledButton>
        )}
      </Flex>
    </>
  );
};
